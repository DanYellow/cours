using UnityEngine;
using UnityEngine.SceneManagement;

public class EndLevelV2 : MonoBehaviour
{
    [HideInInspector]
    public int sceneToLoad;

    void OnTriggerEnter2D(Collider2D collision)
    {
        SceneManager.LoadScene(sceneToLoad);
    }
}
