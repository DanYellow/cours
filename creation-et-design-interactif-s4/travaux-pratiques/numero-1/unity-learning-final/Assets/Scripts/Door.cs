using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    GameObject inputIndicator;
    private bool isDoorOpened = false;
    private bool isPlayerInRange = false;
    public string sceneToLoad;
    public Sprite openDoorSprite;
    public SpriteRenderer spriteRenderer;

    // Start is called before the first frame update
    void Start()
    {
        inputIndicator = gameObject.transform.Find("Input").gameObject;
        inputIndicator.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        if (isDoorOpened && isPlayerInRange && Input.GetAxisRaw("Vertical") == 1)
        {
            LoadLevelManager.LoadScene(sceneToLoad);
        }

        // if()
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        // other.gameObject.TryGetComponent<Player>(out Player player)
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = true;
            Player player = other.gameObject.GetComponent<Player>();
            Key key = player.GetKey();
            if (key != null)
            {
                key.SetFollowTarget(this.transform);
                player.SetKey(null);
                isDoorOpened = true;
                spriteRenderer.sprite = openDoorSprite;
                // Destroy(key);
                key.transform.gameObject.SetActive(false);
            }

            if (isDoorOpened)
            {
                inputIndicator.SetActive(true);
            }
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            inputIndicator.SetActive(false);
            isPlayerInRange = false;
        }
    }
}
