using UnityEngine;
using UnityEngine.SceneManagement;

[RequireComponent(typeof(BoxCollider2D))]
public class EndLevel : MonoBehaviour
{
    [Header("Scene's name to load after the collider is triggered"), SerializeField]
    private string sceneToLoad;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            SceneManager.LoadScene(sceneToLoad);
        }
    }
}
