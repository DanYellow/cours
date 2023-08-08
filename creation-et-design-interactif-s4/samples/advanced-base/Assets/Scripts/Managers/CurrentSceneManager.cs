using UnityEngine;
using UnityEngine.SceneManagement;

public class CurrentSceneManager : MonoBehaviour
{
    public StringEventChannelSO onLevelEnded;

    private void OnEnable()
    {
        onLevelEnded.OnEventRaised += LoadScene;
    }

    void Update()
    {
#if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.R))
        {
            Time.timeScale = 1f;
            RestartLevel();
        }

        if (Input.GetKeyDown(KeyCode.M))
        {
            RestartLastCheckpoint();
        }

        if (Input.GetKeyDown(KeyCode.K))
        {
            ToggleGameWindowSizeInEditor();
        }

        if (Input.GetKeyDown(KeyCode.L))
        {
            QuitGame();
        }

        if (Input.GetKeyDown(KeyCode.P))
        {
            LoadScene("Debug");
        }
#endif
    }

    public void LoadScene(string sceneName)
    {
        if (SceneManager.GetSceneByName(sceneName).IsValid())
        {
            SceneManager.LoadScene(sceneName);
        }
        else
        {
            Debug.Log("Unknown scene");
        }
    }

    public void RestartLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void RestartLastCheckpoint()
    {
        Debug.Log("RestartLastCheckpoint");
        // Refill life to full
        // Position to last checkpoint
        // Remove menu
        // Reset Rigidbody
        // Reactivate Player movements
        // Reset Player's rotation
    }

    public void QuitGame()
    {
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit();
#endif
    }

    private void OnDisable()
    {
        onLevelEnded.OnEventRaised -= LoadScene;
    }

#if UNITY_EDITOR
    private void ToggleGameWindowSizeInEditor()
    {
        UnityEditor.EditorWindow window = UnityEditor.EditorWindow.focusedWindow;
        window.maximized = !window.maximized;
    }
#endif
}
