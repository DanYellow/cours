using UnityEngine;


public class PlayerMovement : MonoBehaviour
{
    private Animator _animator;

    [Header("Physics")]
    private Rigidbody2D _rb;
    private CapsuleCollider2D _capsuleCollider;

    private float _horizontalMovement;

    [Range(100.0f, 1000.0f)]
    [SerializeField]
    private float _moveSpeed;

    private bool _isFacingRight = true;
    [Header("Ground Management")]
    private bool _isGrounded = true;
    [SerializeField]
    private LayerMask listCollisionLayers;
    public Transform _groundCheck;
    [SerializeField]
    private float _groundCheckRadius;

    private PlayerListSkills _playerSkills;

    void Awake()
    {
        // Ici, nous allons récupérer différent composant de notre gameobject.
        // Nous pouvons également mettre les propriétés en "public" et faire un glisser-déposer depuis l'inspecteur
        // Mettre tout en public peut être confus si on a trop de propriétés
        // A noter que parfois nous ne pouvons pas forcément utiliser "GetComponent"
        _capsuleCollider = this.GetComponent<CapsuleCollider2D>();
        _animator = this.GetComponent<Animator>();
        _rb = GetComponent<Rigidbody2D>();
        _playerSkills = PlayerListSkills.GetInstance();
    }
    // Start is called before the first frame update
    void Start()
    {
        _moveSpeed = 380.0f;
    }

    // La méthode est appelée toutes les frames. Par exemple, si notre jeu tourne à 60 frames par seconde (fps)
    // Alors la méthode sera appelée 60 fps par secondes.
    // C'est notamment dans cette fonction que nous pouvons récupérer les entrées utilisateurs comme les touches appuyées
    void Update()
    {
        CheckInputs();
        ManageAnimator();
    }

    void FixedUpdate()
    {
        _isGrounded = Physics2D.OverlapCircle(_groundCheck.position, _groundCheckRadius, listCollisionLayers);
        Move();
    }

    void CheckInputs()
    {
        _horizontalMovement = Input.GetAxisRaw("Horizontal") * _moveSpeed;
        if(Input.GetKeyDown(KeyCode.G)) {
            DebugListSkills();
        }
    }

    void DebugListSkills() {
        Debug.Log(_playerSkills.GetPlayerSkills());
        Debug.Log("Jump : " + _playerSkills.isSkillUnlocked(PlayerListSkills.SkillType.Jump));
    }

    void ManageAnimator()
    {
        _animator.SetFloat("HorizontalSpeed", Mathf.Abs(_horizontalMovement * Time.fixedTime));
        _animator.SetFloat("VerticalSpeed", _rb.velocity.y);
    }

    void Move()
    {
        _rb.velocity = new Vector2(_horizontalMovement * Time.fixedDeltaTime, _rb.velocity.y);

        if (_horizontalMovement > 0 && !_isFacingRight || _horizontalMovement < 0 && _isFacingRight)
        {
            _isFacingRight = !_isFacingRight;
            transform.Rotate(0f, 180f, 0f);
        }
    }

    void OnDrawGizmosSelected()
    {
        if (_groundCheck == null)
        {
            return;
        }
        Gizmos.DrawWireSphere(_groundCheck.position, _groundCheckRadius);
    }
}
