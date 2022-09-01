using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadLevelManager : MonoBehaviour
{
    public Health playerHealth;
    public static LoadLevelManager instance;

    private bool isGamePaused = false;

    private void OnEnable()
    {
        playerHealth.onDie += PlayerDie;
    }

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
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }

        if (Input.GetKeyDown(KeyCode.Escape))
        {
            isGamePaused = !isGamePaused;
        }

        if (isGamePaused)
        {
            Time.timeScale = 0f;
        }
        else
        {
            Time.timeScale = 1.0f;
        }
    }

    public static void LoadScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }

    public void PlayerDie()
    {
        // SceneManager.LoadScene("GameOver");
    }

    private void OnDisable()
    {
        playerHealth.onDie -= PlayerDie;
    }
}
