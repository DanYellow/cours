using UnityEngine;

public class PauseManager : MonoBehaviour
{
    public BoolEventChannelSO onTogglePauseEvent;
    public GameObject pauseMenuUI;

    bool isGamePaused = false;

    private void Awake() {
        pauseMenuUI.SetActive(false);
    }

    void Update()
    {
        // if (Input.GetKeyDown(KeyCode.Escape))
        // {
        //     if (isGamePaused)
        //     {
        //         Resume();
        //     }
        //     else
        //     {
        //         Pause();
        //     }
        // }
    }

    public void Resume()
    {
        Time.timeScale = 1;
        isGamePaused = false;
        onTogglePauseEvent.Raise(isGamePaused);
        pauseMenuUI.SetActive(isGamePaused);
        Application.targetFrameRate = 60;
    }

    void Pause()
    {
        isGamePaused = true;
        Time.timeScale = 0;
        onTogglePauseEvent.Raise(isGamePaused);
        pauseMenuUI.SetActive(isGamePaused);
        Application.targetFrameRate = 30;
    }
}
