using UnityEngine;

public class Door : MonoBehaviour
{
    GameObject inputIndicator;

    [SerializeField]
    private bool isDoorOpened = false;
    private bool isPlayerInRange = false;
    public string sceneToLoad;
    public Sprite openDoorSprite;
    public SpriteRenderer spriteRenderer;
    public Animator animator;

    private GameObject player;

    public Door destination;

    public enum Type
    {
        Normal,
        Portal,
    }

    public Type type;

    // Start is called before the first frame update
    void Start()
    {
        inputIndicator = gameObject.transform.Find("Input").gameObject;
        inputIndicator.SetActive(false);
        if (isDoorOpened)
        {
            if (type == Type.Normal)
            {
                animator.SetTrigger("Unlock");
            }
            else
            {
                animator.SetTrigger("UnlockPortal");
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (isDoorOpened && isPlayerInRange && Input.GetKeyDown(KeyCode.UpArrow))
        {
            if (type == Type.Normal)
            {
                LoadLevelManager.LoadScene(sceneToLoad);
            }
            else if (type == Type.Portal && player != null && destination.isDoorOpened)
            {
                player.transform.position = destination.transform.position;
            }
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        // other.gameObject.TryGetComponent<Player>(out Player player)
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = true;
            Key key = PlayerInventory.instance?.GetKey();

            if (key != null)
            {
                key.SetFollowTarget(this.transform);
                PlayerInventory.instance.SetKey(null);
                isDoorOpened = true;
                key.transform.gameObject.SetActive(false);
                Destroy(key.gameObject);

                if (type == Type.Normal)
                {
                    animator.SetTrigger("Unlock");
                }
                else
                {
                    animator.SetTrigger("UnlockPortal");
                }
            }

            if (isDoorOpened)
            {
                inputIndicator.SetActive(true);
                player = other.gameObject;
            }
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            inputIndicator.SetActive(false);
            isPlayerInRange = false;
            player = null;
        }
    }
}
