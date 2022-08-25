using UnityEngine;

public class SeekerBehavior : MonoBehaviour
{
    private bool _isSeekingPlayer = false;
    private Animator _animator;
    private GameObject _player;
    private SpriteRenderer _spriteRenderer;
    private Vector2 _velocity = Vector2.zero;

    [SerializeField]
    private bool _isNotInLevelFlow;

    float amplitudeX = 10.0f;
    float amplitudeY = 5.0f;
    float omegaX = 1.0f;
    float omegaY = 5.0f;
    float index;

    private void Awake()
    {
        _animator = transform.GetComponent<Animator>();
        _spriteRenderer = transform.GetComponent<SpriteRenderer>();
    }

    // Update is called once per frame
    void Update()
    {
        if (_isSeekingPlayer)
        {
            SeekPlayer();
        }

        index += Time.deltaTime * 0.5f;
        float x = amplitudeX * Mathf.Cos(omegaX * index);
        float y = Mathf.Abs(amplitudeY * Mathf.Sin(omegaY * index));
        transform.localPosition = new Vector3(x, y, 0);
    }
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Debug.Log(other.GetContacts);
            // Debug.Log(collision.contacts[0].normal.x);
            _player = other.gameObject;
            _isSeekingPlayer = true;
            FlipDirection();
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        _isSeekingPlayer = false;
    }

    private void SeekPlayer()
    {
        transform.position += transform.right * Mathf.Sin(Time.time * 3f + 1f) * 1f; ;
        // transform.position = Vector2.SmoothDamp(
        //     transform.position,
        //     new Vector2(_player.transform.position.x, transform.position.y),
        //     ref _velocity,
        //     1.3f
        // );
    }

    private void FlipDirection()
    {
        if (_player.transform.position.x > transform.position.x)
        {
            this.transform.Rotate(0f, 180f * 0 * (_isNotInLevelFlow ? -1 : 1), 0f);
        }
        else
        {
            this.transform.Rotate(0f, 180f * 1 * (_isNotInLevelFlow ? -1 : 1), 0f);
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.collider.gameObject.layer == LayerMask.NameToLayer("Projectile"))
        {
            _animator.SetTrigger("IsHit");
        }
    }
}
