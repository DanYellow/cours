using UnityEngine;

public class Checkpoint : MonoBehaviour
{
    private Transform playerSpawnTransform;

    private void Awake()
    {
        playerSpawnTransform = GameObject.FindGameObjectWithTag("PlayerSpawn").transform;
        Debug.Log("playerSpawnTransform " + playerSpawnTransform);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            playerSpawnTransform.position = transform.position;
            // Destroy(gameObject);
            gameObject.GetComponent<BoxCollider2D>().enabled = false;
            // gameObject.transform.Find("Graphics").gameObject.GetComponent<Animator>().enabled = true;
        }
    }
}
