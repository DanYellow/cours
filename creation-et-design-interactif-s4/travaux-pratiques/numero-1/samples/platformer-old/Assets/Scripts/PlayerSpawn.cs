using UnityEngine;

public class PlayerSpawn : MonoBehaviour
{
    private void Awake()
    {
        GameObject player = GameObject.FindGameObjectWithTag("Player");
        // Debug.Log("fezfez" + player.GetComponent<Health>().GetHealth())
        player.transform.position = transform.position;
        if (player.GetComponent<Health>().GetHealth() > 0)
        {
        }
    }
}
