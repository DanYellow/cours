using UnityEngine;

public class SeekerBehavior : MonoBehaviour
{
    private bool _isSeekingPlayer = false;
    private Animator _animator;

    private GameObject _player;
    private Rigidbody2D _rb;

    public float moveSpeed;

    private Vector2 _velocity = Vector2.zero;
    Vector2 _moveDirection;
    Vector3 _originPosition;

    private void Awake()
    {
        _animator = transform.GetComponent<Animator>();
        _rb = transform.GetComponent<Rigidbody2D>();
        _originPosition = transform.position;
    }

    void Update()
    {
        if (_isSeekingPlayer)
        {
            _moveDirection = (_player.transform.position - transform.position).normalized;
        } else {
            _moveDirection = (_originPosition - transform.position).normalized;
        }
    }

    private void FixedUpdate()
    {
        Move();
    }

    private void OnTriggerStay2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            _player = collider.gameObject;
            _isSeekingPlayer = true;
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        _isSeekingPlayer = false;
    }

    private void Move()
    {
        if (_rb)
        {
            _rb.velocity = new Vector2(_moveDirection.x, _moveDirection.y) * (_isSeekingPlayer ? moveSpeed : moveSpeed * 1.5f);
        }
    }
}
