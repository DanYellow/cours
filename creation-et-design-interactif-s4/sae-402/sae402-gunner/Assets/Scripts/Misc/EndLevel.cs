using UnityEngine;

public class EndLevel : MonoBehaviour
{
    public string nextLevel;

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            if (nextLevel != null)
            {
                LoadLevelManager.LoadScene(nextLevel);
            }
        }
    }
}
