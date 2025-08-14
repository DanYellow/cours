using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlockHit : MonoBehaviour
{
    private Animator animator;
    public int numberHits = -1;
    private bool isAnimating;

    public GameObject itemPrefab;
    public bool isHidden = false;
    public SpriteRenderer sr;

    public Collider2D coll;

    private void Awake()
    {
        animator = GetComponent<Animator>();

        sr.enabled = !isHidden;

        foreach (Transform g in transform.GetComponentsInChildren<Transform>())
        {
            if (g != transform)
            {
                g.gameObject.SetActive(false);
            }
        }

    }

    private ContactPoint2D[] listContacts = new ContactPoint2D[1];

    private void OnCollisionEnter2D(Collision2D collision)
    {
        collision.GetContacts(listContacts);
        // coll.enabled = false;
        // listContacts[0].normal.y > 0.5f
        if (!isAnimating && collision.gameObject.CompareTag("Player") && numberHits > 0)
        {
            coll.enabled = true;
            StartCoroutine(Hit());
            // Vector3 forward = transform.TransformDirection(Vector3.up);
            // Vector3 toOther = (collision.transform.position - transform.position).normalized;

            // if (Vector3.Dot(forward, toOther) < 0)
            // {
            //     StartCoroutine(Hit());
            // }
        }
    }

    IEnumerator Hit()
    {
        animator.SetTrigger("Hit");
        yield return null;
        numberHits--;
        sr.enabled = true;

        StartCoroutine(Animate());

        if (itemPrefab != null)
        {
            GameObject item = Instantiate(itemPrefab, transform.position, Quaternion.identity);
            item.GetComponent<Collectible>().canBeDestroyedDirectly = false;
            yield return item.transform.MoveBackAndForth(item.transform.localPosition + Vector3.up * 1.5f);
            item.GetComponent<Collectible>().Picked();
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
