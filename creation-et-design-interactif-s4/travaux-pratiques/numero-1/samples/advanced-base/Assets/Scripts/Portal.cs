using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Portal : MonoBehaviour
{
    public string sceneToLoad;
    private bool isPlayerInRange = false;

    // Update is called once per frame
    void Update()
    {
        if (isPlayerInRange)
        {
            GameObject.FindObjectOfType<LoadLevelManager>().LoadScene("Level2");
        }
    }

     private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = true;
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerInRange = false;
        }
    }
}
