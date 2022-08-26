using UnityEngine;

public class SeekerBehavior : MonoBehaviour
{
    private bool _isSeekingPlayer = false;
    private Animator _animator;

    private GameObject _player;
    private Rigidbody2D _rb;

    private Vector2 _velocity = Vector2.zero;

    private void Awake()
    {
        _animator = transform.GetComponent<Animator>();
        _rb = transform.GetComponent<Rigidbody2D>();
        Debug.Log("_rb " + _rb);

    }

    // Update is called once per frame
    void Update()
    {
        if (_isSeekingPlayer)
        {
            // Debug.Log("_isSeekingPlayer " + _isSeekingPlayer);
            // SeekPlayer();
            // return;
        }
    }

    private void FixedUpdate() {
        // if(_isSeekingPlayer) {
        //     Debug.Log("_isSeekingPlayer " + _isSeekingPlayer);
        //     _rb.velocity = new Vector2(_player.transform.position.x,  _player.transform.position.y) * 2.0f * Time.fixedDeltaTime;
        // }
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

    private void SeekPlayer()
    {
        transform.position = Vector2.SmoothDamp(
            transform.position,
            new Vector2(_player.transform.position.x, transform.position.y),
            ref _velocity,
            1.3f
        );
    }
}
