using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cloud : MonoBehaviour
{
    public float speed;
    public SpriteRenderer sr;

    public Sprite[] listSprites;

    private float width;

    private void Awake()
    {
        sr.sprite = listSprites[Random.Range(0, listSprites.Length)];
    }

    // Start is called before the first frame update
    void Start()
    {
        width = sr.bounds.size.x;
        transform.position = new Vector2(
            Random.Range(
                ScreenUtility.Instance.Left + (sr.bounds.size.x / 2),
                ScreenUtility.Instance.Right - (sr.bounds.size.x / 2)
            ),
            transform.position.y
        );
    }

    // Update is called once per frame
    void Update()
    {
        Vector2 direction = Vector2.left * speed * Time.deltaTime;
        transform.Translate(direction, Space.World);

        if (transform.position.x < ScreenUtility.Instance.Left - width)
        {
            StartCoroutine(ResetPosition());
        }
    }

    IEnumerator ResetPosition()
    {
        yield return new WaitForSeconds(1f);
        transform.position = new Vector2(
            ScreenUtility.Instance.Right + width,
            transform.position.y
        );
    }
}
