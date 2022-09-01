using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadLevelManager : MonoBehaviour
{
    // public Health playerHealth;
    public static LoadLevelManager instance;


    private void OnEnable()
    {
        // playerHealth.onDie += PlayerDie;
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

        if(Input.GetKey(KeyCode.M)) {
            Time.timeScale = 0.05f;
            Time.fixedDeltaTime = Time.timeScale * 0.02f;
        } else {
            Time.timeScale = 1f;
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
        // playerHealth.onDie -= PlayerDie;
    }

    public void QuitGame() {
        Application.Quit();
    }
}
