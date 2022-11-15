using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadLevelManager : MonoBehaviour
{
    public static LoadLevelManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }

        instance = this;
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            RestartLevel();
        }
    }

    public static void LoadScene(string sceneName)
    {
        // Debug.Log("saveData " + saveData);
        SceneManager.LoadScene(sceneName);
        // if(saveData) {
        //     LoadAndSaveData.instance.Save();
        // }
    }

    public void RestartLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void PlayerDie()
    {
        SceneManager.LoadScene("GameOver");
    }


    public void QuitGame()
    {
        Application.Quit();
    }
}
