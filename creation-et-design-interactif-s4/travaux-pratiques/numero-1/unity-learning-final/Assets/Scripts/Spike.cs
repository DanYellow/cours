using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spike : MonoBehaviour
{
    public float speed = 0.5f;
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
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.TryGetComponent<Health>(out Health health))
        {
            health.TakeDamage(1f);
        }
    }

    private void Start()
    {
        StartCoroutine(UpAndDown());
    }
    // Update is called once per frame
    void Update()
    {
        // transform.position = Vector3.Lerp(originPosition, finalPosition, (Mathf.Sin(speed * Time.time) + 1.0f) / 2.0f);
        // transform.position = Vector3.Lerp(originPosition, finalPosition, Mathf.PingPong(Time.time * speed, 1.0f));
        // transform.Translate(Vector2.down * speed * Time.deltaTime);
        // transform.Translate(
        //     new Vector3(transform.position.x, transform.position.y, transform.position.z),
        //     // new Vector3(transform.position.x, 1 * 0.05f, transform.position.z),
        // Space.World);
    }

    IEnumerator UpAndDown()
    {

        while (true)
        {
            // transform.position = Vector3.Lerp(originPosition, finalPosition, (Mathf.Sin(speed * Time.time) + 1.0f) / 2.0f);
            // transform.position = originPosition;

            transform.position = originPosition;
            yield return new WaitForSeconds(2f);

            float elapsedTime = 0f;
            float speed = 2f;
            while (elapsedTime <= speed)
            {
                elapsedTime = elapsedTime + Time.deltaTime;
                float percent = Mathf.Clamp01(elapsedTime / speed);

                transform.position = Vector3.Lerp(originPosition, finalPosition, percent);

                yield return null;
            }

            yield return new WaitForSeconds(3f);
            // transform.position = Vector3.Lerp(finalPosition, originPosition, (Mathf.Sin(speed * Time.time) + 1.0f) / 2.0f);
            // transform.position = finalPosition;
            // yield return new WaitForSeconds(1f);
        }
    }
}
