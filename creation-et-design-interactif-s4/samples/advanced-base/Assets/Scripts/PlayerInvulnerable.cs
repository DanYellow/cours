using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerInvulnerable : MonoBehaviour
{
    private float invulnerableDeltaTime = 0.15f;
    private WaitForSeconds waitInvulnerableDeltaTime;

    public SpriteRenderer spriteRenderer;

    public bool isInvulnerable = false;

    public LayerMask layersToIgnoreAfterHit;

    [SerializeField]
    private float invulnerableDuration = 2.5f;

    private List<int> listLayersIndexes = new List<int>();

    // Start is called before the first frame update
    void Start()
    {
        // Delay between player flashes
        waitInvulnerableDeltaTime = new WaitForSeconds(invulnerableDeltaTime);
        CreateListLayers();
        ToggleCollisions(gameObject.layer, false);
    }

    private void CreateListLayers()
    {
        for (int i = 0; i < 32; i++)
        {
            if (layersToIgnoreAfterHit == (layersToIgnoreAfterHit | (1 << i)))
            {
                listLayersIndexes.Add(i);
            }
        }
    }

    public IEnumerator Invulnerable()
    {
        isInvulnerable = true;
        ToggleCollisions(gameObject.layer, isInvulnerable);

        for (float i = 0; i < invulnerableDuration; i += invulnerableDeltaTime)
        {
            if(spriteRenderer.color.a == 1) {
                spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            } else {
                spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            }

            yield return waitInvulnerableDeltaTime;
        }

        spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
        isInvulnerable = false;
        ToggleCollisions(gameObject.layer, isInvulnerable);
    }

    public void ToggleCollisions(int gameObjectLayer, bool enabled)
    {
        foreach (var layerIndex in listLayersIndexes)
        {
            Physics2D.IgnoreLayerCollision(
                gameObjectLayer,
                layerIndex,
                enabled
            );
        }
    }
}
