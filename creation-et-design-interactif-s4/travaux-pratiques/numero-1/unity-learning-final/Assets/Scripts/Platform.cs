using UnityEngine;

public class Platform : MonoBehaviour
{
    public float speed;
    public Transform[] listWaypoints;
    private Transform _target;
    private int _destPoint = 0;

    public GameObject player;

    // Start is called before the first frame update
    void Start()
    {
        _target = listWaypoints[0];
    } // https://pavcreations.com/moving-platforms-in-a-2d-side-scroller-unity-game/

    void Update()
    {
        transform.position = Vector2.MoveTowards(transform.position, _target.position, speed * Time.deltaTime);

        if (Vector2.Distance(transform.position, _target.position) < 0.01f)
        {
            _destPoint = (_destPoint + 1) % listWaypoints.Length;
            _target = listWaypoints[_destPoint];
        }
    }

    void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.transform.parent = transform;
        }
    }


    void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.transform.parent = null;
        }
    }
}
