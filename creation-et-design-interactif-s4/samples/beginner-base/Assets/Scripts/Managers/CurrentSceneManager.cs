using UnityEngine.SceneManagement;
using UnityEngine;

public class CurrentSceneManager : MonoBehaviour
{
    public BoolEventChannelSO onTogglePauseEvent;

    bool isGamePaused = false;
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (isGamePaused)
            {
                Resume();
            }
            else
            {
                Pause();
            }
        }

        if (Input.GetKeyDown(KeyCode.R))
        {
            RestartLevel();
        }
    }

    public void Resume()
    {
        Time.timeScale = 1;
        isGamePaused = false;
        onTogglePauseEvent.Raise(isGamePaused);
    }

    void Pause()
    {
        isGamePaused = true;
        Time.timeScale = 0;
        onTogglePauseEvent.Raise(isGamePaused);
    }

    public bool IsGamePaused()
    {
        return isGamePaused;
    }

    public void RestartLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void PlayerDie()
    {
        SceneManager.LoadScene("GameOver");
    }
}
