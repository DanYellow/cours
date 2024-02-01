using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerInvulnerable : MonoBehaviour
{
    float invulnerableDeltaTime = 0.15f;
    public WaitForSeconds waitInvulnerableDeltaTime;

    public SpriteRenderer spriteRenderer;

    public bool isInvincible = false;

    public LayerMask layersToIgnoreAfterHit;
    public float invulnerableDuration = 2.5f;

    public List<int> listLayersIndexes = new List<int>();

    // Start is called before the first frame update
    void Start()
    {
        // Delay between player flashes
        waitInvulnerableDeltaTime = new WaitForSeconds(invulnerableDeltaTime);
        CreateListLayers();
        ToggleCollisions(LayerMask.LayerToName(gameObject.layer), false);
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
        isInvincible = true;
        ToggleCollisions(LayerMask.LayerToName(gameObject.layer), isInvincible);

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
        isInvincible = false;
        ToggleCollisions(LayerMask.LayerToName(gameObject.layer), isInvincible);
    }

    public void ToggleCollisions(string layerName, bool enabled)
    {
        foreach (var layerIndex in listLayersIndexes)
        {
            Physics2D.IgnoreLayerCollision(
                LayerMask.NameToLayer(layerName),
                layerIndex,
                enabled
            );
        }
    }
}
