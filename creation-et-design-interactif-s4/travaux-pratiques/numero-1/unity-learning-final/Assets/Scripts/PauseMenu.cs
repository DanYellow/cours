using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PauseMenu : MonoBehaviour
{
    public GameObject PauseMenuUI;
    private bool isGamePaused = false;
    // Start is called before the first frame update
    void Start()
    {
        PauseMenuUI.SetActive(isGamePaused);
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            isGamePaused = !isGamePaused;

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
        PauseMenuUI.SetActive(false);
    }

    void Pause()
    {
        Time.timeScale = 0f;
        PauseMenuUI.SetActive(true);
    }

    public bool IsGamePaused() {
        return isGamePaused;
    }
}
