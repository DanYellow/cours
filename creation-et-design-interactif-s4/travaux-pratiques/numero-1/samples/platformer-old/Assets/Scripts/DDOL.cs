using UnityEngine;
using UnityEngine.SceneManagement;
// https://stackoverflow.com/questions/35890932/unity-game-manager-script-works-only-one-time/35891919#35891919
 // https://gamedev.stackexchange.com/questions/185528/preload-scene-in-unity
 // https://stackoverflow.com/questions/32306704/how-to-pass-data-and-references-between-scenes-in-unity
public class DDOL : MonoBehaviour
{
    public GameObject[] listObjects;

    private void Awake() {
        DontDestroyOnLoad(gameObject);
        Debug.Log("DDOL " + gameObject.name);

        foreach (var element in listObjects)
        {
            // Permet de garder des éléments (avec le même "statut") d'une scène à une autre
            DontDestroyOnLoad(element);
        }
    }

    private void Start() {
        SceneManager.LoadScene(1);
    }
}
