using UnityEngine;

public class GunnerMovement : MonoBehaviour
{
    private CapsuleCollider2D _capsuleCollider;
    private Animator _animator;
    private Rigidbody2D _rb;

    private float _horizontalMovement;

    [Range(100.0f, 1000.0f)]
    [SerializeField]
    private float _moveSpeed;

    [SerializeField]
    private bool _isFacingRight = true;
    [Header("Ground Management")]
    private bool _isGrounded = true;
    public LayerMask listCollisionLayers;
    public Transform _groundCheck;
    [SerializeField]
    private float _groundCheckRadius;

    void Awake()
    {
        // Ici, nous allons récupérer différent composant de notre gameobject.
        // Nous pouvons également mettre les propriétés en "public" et faire un glisser-déposer depuis l'inspecteur
        // Mettre tout en public peut être confus si on a trop de propriétés
        // A noter que parfois nous ne pouvons pas forcément utiliser "GetComponent"
        _capsuleCollider = this.GetComponent<CapsuleCollider2D>();
        _animator = this.GetComponent<Animator>();
        _rb = GetComponent<Rigidbody2D>();

    }
    // Start is called before the first frame update
    void Start()
    {
        _moveSpeed = 275.0f;
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
        Move();

        _isGrounded = Physics2D.OverlapCircle(_groundCheck.position, _groundCheckRadius, listCollisionLayers);
    }

    void CheckInputs()
    {
        _horizontalMovement = Input.GetAxisRaw("Horizontal") * _moveSpeed;
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
