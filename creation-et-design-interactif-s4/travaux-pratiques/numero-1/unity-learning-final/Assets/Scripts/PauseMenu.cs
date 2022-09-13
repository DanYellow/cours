using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Audio;
using UnityEngine.UI;

public class PauseMenu : MonoBehaviour
{
    public GameObject pauseMenuUI;
    private bool isGamePaused = true;

    public AudioMixer audioMixer;
    public Slider musicSlider;

    // Start is called before the first frame update
    void Start()
    {
        audioMixer.GetFloat("Music", out float musicValueForSlider);
        musicSlider.value = musicValueForSlider;

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

    public void MusicVolume(float volume)
    {
        audioMixer.SetFloat("Music", volume);
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
