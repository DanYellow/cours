using UnityEngine;
using UnityEngine.Tilemaps;

public class SecretArea : MonoBehaviour
{
    private TilemapRenderer tilemapRenderer;

    private void Awake()
    {
        tilemapRenderer = GetComponent<TilemapRenderer>();
        tilemapRenderer.maskInteraction = SpriteMaskInteraction.None;
    }

    void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            tilemapRenderer.maskInteraction = SpriteMaskInteraction.VisibleOutsideMask;
        }
    }

    void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            tilemapRenderer.maskInteraction = SpriteMaskInteraction.None;
        }
    }
}
