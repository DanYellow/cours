using System.Collections;
using UnityEngine;

public class Cloud : MonoBehaviour
{
    private float speed;
    public SpriteRenderer sr;
    public Sprite[] listSprites;
    private float width;
    private bool isResettingPos = false;
    private float minSpeed = 0.95f;
    private float maxSpeed = 1.95f;

    private void Awake()
    {
        speed = Random.Range(minSpeed, maxSpeed);
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
            Random.Range(
                ScreenUtility.Instance.Top,
                ScreenUtility.Instance.Top * 0.3f
            )
        );
    }

    // Update is called once per frame
    void Update()
    {
        Vector2 direction = Vector2.left * speed * Time.deltaTime;
        transform.Translate(direction, Space.World);

        if(Input.GetKeyDown(KeyCode.U)) {
            Debug.Log(" ScreenUtility.Instance.Left " + ScreenUtility.Instance.Left);
            Debug.Log(" (ScreenUtility.Instance.Left + ScreenUtility.Instance.Left / 2) " + (ScreenUtility.Instance.Left + ScreenUtility.Instance.Left / 2));
            Debug.Log("ScreenUtility.Instance.Left * 1.5f " + (ScreenUtility.Instance.Left * 1.5f));
            Debug.Log("sr.bounds. " + (sr.bounds.max.x));
            Debug.Log("transform.position.x " + transform.position.x);
        }

        if (sr.bounds.max.x < (ScreenUtility.Instance.Left - width) && !isResettingPos)
        {
                    // Debug.Log("(ScreenUtility.Instance.Left + ScreenUtility.Instance.Left / 2)" + (ScreenUtility.Instance.Left - ScreenUtility.Instance.Left / 2));

            StartCoroutine(ResetPosition());
        }
    }

    IEnumerator ResetPosition()
    {
        isResettingPos = true;
        sr.enabled = false;
        speed = Random.Range(minSpeed, maxSpeed);
        yield return new WaitForSeconds(1f);
        sr.sprite = listSprites[Random.Range(0, listSprites.Length)];
        sr.enabled = true;
        transform.position = new Vector2(
            ScreenUtility.Instance.Right + width,
            Random.Range(
                ScreenUtility.Instance.Top,
                ScreenUtility.Instance.Top * 0.3f
            )
        );
        isResettingPos = false;
    }
}
