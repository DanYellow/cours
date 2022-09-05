using UnityEngine;
using UnityEngine.EventSystems;

public class PauseMenu : MonoBehaviour
{
    public GameObject pauseMenuUI;
    private bool isGamePaused = false;
    // Start is called before the first frame update
    void Start()
    {
        pauseMenuUI.SetActive(isGamePaused);
    }

    // Update is called once per frame
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

        // Cursor.lockState = CursorLockMode.Locked;
        // Cursor.visible = false;
    }

    public void Resume()
    {
        pauseMenuUI.SetActive(false);
        PlayerMovement.instance.enabled = true;
        Time.timeScale = 1;
        isGamePaused = false;
    }

    void Pause()
    {
        pauseMenuUI.SetActive(true);
        PlayerMovement.instance.enabled = false;
        EventSystem.current.SetSelectedGameObject(GameObject.Find("PauseMenu/Resume"));
        Time.timeScale = 0;
        isGamePaused = true;
    }

    public bool IsGamePaused()
    {
        return isGamePaused;
    }
}
