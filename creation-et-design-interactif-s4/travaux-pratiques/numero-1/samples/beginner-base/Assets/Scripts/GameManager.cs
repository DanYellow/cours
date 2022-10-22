using UnityEngine.SceneManagement;
using UnityEngine;
using UnityEngine.Events;

public class GameManager : MonoBehaviour
{
    public BoolEventChannelSO togglePauseEvent;

    public UnityEvent<bool> PauseEvent;
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
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }
    }

    public void Resume()
    {
        Time.timeScale = 1;
        isGamePaused = false;
        togglePauseEvent.RaiseEvent(isGamePaused);
        PauseEvent.Invoke(isGamePaused);
    }

    void Pause()
    {
        isGamePaused = true;
        Time.timeScale = 0;
        togglePauseEvent.RaiseEvent(isGamePaused);
        PauseEvent.Invoke(isGamePaused);
    }

    public bool IsGamePaused()
    {
        return isGamePaused;
    }
}
