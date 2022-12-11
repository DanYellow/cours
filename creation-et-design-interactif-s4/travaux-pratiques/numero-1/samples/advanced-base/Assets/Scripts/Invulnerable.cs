using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Invulnerable : MonoBehaviour
{
    private bool isInvulnerable = false;
    public float invulnerableFlashDelay = 0.2f;
    public float invulnerableTimeAfterHit = 2.5f;
    public SpriteRenderer spriteRenderer;
    public LayerMask listLayerToIgnoreAfterHit;

    private List<int> listLayers = new List<int>();


    private void Start()
    {
        CheckMasks();

        foreach (var layerIndex in listLayers)
        {
            Physics2D.IgnoreLayerCollision(gameObject.layer, layerIndex, false);
        }
    }

    private void CheckMasks()
    {
        for (int i = 0; i < 32; i++)
        {
            if (listLayerToIgnoreAfterHit == (listLayerToIgnoreAfterHit | (1 << i)))
            {
                listLayers.Add(i);
            }
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        ContactPoint2D[] allContacts = new ContactPoint2D[other.contactCount];
        other.GetContacts(allContacts);
        LayerMask otherLayer = other.gameObject.layer;
        bool isInLayer = ((listLayerToIgnoreAfterHit & (1 << otherLayer)) != 0);

        if (!isInvulnerable && isInLayer)
        {
            foreach (ContactPoint2D contact in allContacts)
            {
                bool itCollidesFromSides = Mathf.Abs(contact.normal.x) > 0.5 && Mathf.Abs(contact.relativeVelocity.x) <= 50;
                bool itCollidesFromBottom = contact.normal.y < -0.5f;
                if (
                    itCollidesFromSides || itCollidesFromBottom
                )
                {
                    StartCoroutine(HandleInvincibilityDelay(otherLayer.value));
                    StartCoroutine(InvincibilityFlash());
                }
            }
        }
    }

    public IEnumerator InvincibilityFlash()
    {
        while (isInvulnerable)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return new WaitForSeconds(invulnerableFlashDelay);
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return new WaitForSeconds(invulnerableFlashDelay);
        }

        // Hack to reenable OnTriggerEnter/Stay methods
        gameObject.transform.position = new Vector3(
            gameObject.transform.position.x + 0.001f,
            gameObject.transform.position.y
        );
    }

    public IEnumerator HandleInvincibilityDelay(int layerId)
    {
        Physics2D.IgnoreLayerCollision(gameObject.layer, layerId, true);
        isInvulnerable = true;
        yield return new WaitForSeconds(invulnerableTimeAfterHit);
        isInvulnerable = false;
        Physics2D.IgnoreLayerCollision(gameObject.layer, layerId, false);
    }
}
