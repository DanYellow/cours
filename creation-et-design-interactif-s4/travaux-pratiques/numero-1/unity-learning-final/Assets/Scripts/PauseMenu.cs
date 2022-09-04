using System.Collections;
using System.Collections.Generic;
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
    }

    public void Resume()
    {
        Time.timeScale = 1.0f;
        pauseMenuUI.SetActive(false);
        isGamePaused = false;
        PlayerMovement.instance.enabled = true;
    }

    void Pause()
    {
        Time.timeScale = 0f;
        pauseMenuUI.SetActive(true);
        isGamePaused = true;
        PlayerMovement.instance.enabled = false;
        EventSystem.current.SetSelectedGameObject(GameObject.Find("PauseMenu/Resume"));
    }

    public bool IsGamePaused() {
        return isGamePaused;
    }
}
