using UnityEngine;

public class Bumper : MonoBehaviour
{
    public float bounce;
    public Sprite expandedSprite;
    private Sprite originalSprite;
    private SpriteRenderer _spriteRenderer;

    private void Awake() {
        _spriteRenderer = GetComponent<SpriteRenderer>(); 
        originalSprite = _spriteRenderer.sprite;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player") && other.contacts[0].normal.y < -0.5f)
        {
            _spriteRenderer.sprite = expandedSprite;
            Vector2 bounceForce = Vector2.up * bounce;
            other.gameObject.GetComponent<Rigidbody2D>().AddForce(bounceForce, ForceMode2D.Impulse);
        }
    }

    void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            _spriteRenderer.sprite = originalSprite;
        }
    }
}
