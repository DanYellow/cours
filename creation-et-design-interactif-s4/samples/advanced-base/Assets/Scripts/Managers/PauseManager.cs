using UnityEngine;

public class PauseManager : MonoBehaviour
{
    public BoolEventChannelSO onTogglePauseEvent;
    public BoolEventChannelSO onKeyPauseEvent;
    public BoolEventChannelSO onDebugConsoleOpenEvent;
    public GameObject pauseMenuUI;

    bool isGamePaused = false;
    bool isDebugConsoleEnabled = false;

    private void Awake()
    {
        pauseMenuUI.SetActive(false);
    }

    private void OnEnable()
    {
        onDebugConsoleOpenEvent.OnEventRaised += TogglePauseDebug;
        onKeyPauseEvent.OnEventRaised += TogglePause;
    }

    void Update()
    {
        if (!isDebugConsoleEnabled && Input.GetKeyDown(KeyCode.Escape))
        {
            isGamePaused = !isGamePaused;
            onKeyPauseEvent.Raise(isGamePaused);
        }
    }

    public void Resume()
    {
        Time.timeScale = 1;
        onTogglePauseEvent.Raise(false);
        pauseMenuUI.SetActive(false);
        Application.targetFrameRate = 60;
    }

    void Pause(bool displayPauseMenuUI = true)
    {
        Time.timeScale = 0;
        onTogglePauseEvent.Raise(true);
        if (displayPauseMenuUI)
        {

            pauseMenuUI.SetActive(true);
        }
        Application.targetFrameRate = 30;
    }

    void TogglePause(bool pauseGame)
    {
        if (!pauseGame)
        {
            Resume();
        }
        else
        {
            Pause();
        }
    }

    void TogglePauseDebug(bool pauseGame)
    {
        isDebugConsoleEnabled = !isDebugConsoleEnabled;
        if (!pauseGame)
        {
            Resume();
        }
        else
        {
            Pause(false);
        }
    }

    private void OnDisable()
    {
        onDebugConsoleOpenEvent.OnEventRaised -= TogglePauseDebug;
        onKeyPauseEvent.OnEventRaised -= TogglePause;
    }
}
