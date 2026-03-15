using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlockHit : MonoBehaviour
{
    // private Animator animator;
    [SerializeField]
    private int numberHits = -1;
    private bool isAnimating;

    [SerializeField]
    private GameObject itemPrefab;
    [SerializeField]
    private bool isHidden = false;
    private SpriteRenderer sr;

    private PlatformEffector2D pe2D;

    private void Awake()
    {
        // GetComponent: Permet de récupérer un composant sans faire un glisser-déposer
        // animator = GetComponent<Animator>();
        sr = GetComponent<SpriteRenderer>();
        pe2D = GetComponent<PlatformEffector2D>();

        sr.enabled = !isHidden;
        if (numberHits == -1 && sr.enabled == false)
        {
            sr.enabled = true;
            pe2D.enabled = false;
        }

        // foreach (Transform g in transform.GetComponentsInChildren<Transform>())
        // {
        //     if (g != transform)
        //     {
        //         g.gameObject.SetActive(false);
        //     }
        // }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        ContactPoint2D contact = collision.GetContact(0);

        // coll.enabled = false;
        if (!isAnimating && collision.gameObject.CompareTag("Player") && numberHits > 0 && contact.normal.y > 0.5f)
        {
            StartCoroutine(Hit());
        }
    }

    IEnumerator Hit()
    {
        // animator.SetTrigger("Hit");
        yield return null;
        numberHits--;
        sr.enabled = true;
        pe2D.enabled = false;

        StartCoroutine(Animate());

        if (itemPrefab != null)
        {
            GameObject item = Instantiate(itemPrefab, transform.position, Quaternion.identity);
            item.GetComponent<Collectible>().canBeDestroyedDirectly = false;
            yield return item.transform.MoveBackAndForth(item.transform.localPosition + Vector3.up * 1.5f);
            item.GetComponent<Collectible>().Picked();
        }

        if (numberHits == 0)
        {
            sr.color = new Color(1, 1, 1, 0.5f);
            // foreach (Transform g in transform.GetComponentsInChildren<Transform>(true))
            // {
            //     if (g != transform)
            //     {
            //         g.gameObject.SetActive(true);
            //         g.SetParent(null);
            //     }
            // }
            // Destroy(gameObject);
        }
    }

    private IEnumerator Animate()
    {
        isAnimating = true;

        Vector3 initialPosition = transform.localPosition;
        Vector3 animatedPosition = initialPosition + Vector3.up * 0.25f;

        yield return transform.MoveBackAndForth(animatedPosition);

        isAnimating = false;
    }
}
