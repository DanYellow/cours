using UnityEditor;
using UnityEngine.SceneManagement;

public class DebugManagerEditor
{
    [MenuItem("**Debug**/Restart Scene _r")]
    private static void RestartScene()
    {
        Scene currentScene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(currentScene.name);
    }

    [MenuItem("**Debug**/Restart Last Checkpoint _m")]
    private static void RestartLastCheckpoint()
    {
        CurrentSceneManager.RestartLastCheckpoint();
    }

    [MenuItem("**Debug**/Quit game _l")]
    private static void QuitGame()
    {
        CurrentSceneManager.QuitGame();
    }

    [MenuItem("**Debug**/Load Debug scene _o")]
    private static void LoadDebugScene()
    {
        SceneManager.LoadScene("Debug");
    }
}
