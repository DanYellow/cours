using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spike : MonoBehaviour
{
    public float speed = 0.75f;
    public float stayUpTime = 2.0f;
    public float stayDownTime = 3.0f;
    Vector3 originPosition;
    Vector3 finalPosition;

    private void Awake()
    {
        Vector3 size = GetComponent<Renderer>().bounds.size;
        originPosition = transform.position;
        finalPosition = new Vector3(
            originPosition.x,
            originPosition.y - (size.y / 2),
            originPosition.z
        );
    }

    // Start is called before the first frame update
    void  OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.TryGetComponent<Health>(out Health health) && !collision.CompareTag("Boss"))
        {
            if(collision.gameObject.TryGetComponent<Player>(out Player player)) {
                if (player.IsInvisible())
                {
                    return;
                }
            }
            
            health.TakeDamage(1f);
        }
    }

    private void Start()
    {
        StartCoroutine(UpAndDown());
    }

    IEnumerator UpAndDown()
    {
        while (true)
        {
            transform.position = originPosition;
            yield return new WaitForSeconds(stayUpTime);

            float elapsedTime = 0f;
            while (elapsedTime <= speed)
            {
                elapsedTime = elapsedTime + Time.deltaTime;
                float percent = Mathf.Clamp01(elapsedTime / speed);

                transform.position = Vector3.Lerp(originPosition, finalPosition, percent);

                yield return null;
            }

            yield return new WaitForSeconds(stayDownTime);

        }
    }
}
