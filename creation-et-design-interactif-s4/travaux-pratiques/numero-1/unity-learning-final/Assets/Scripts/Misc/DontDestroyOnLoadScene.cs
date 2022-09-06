using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine;

public class DontDestroyOnLoadScene : MonoBehaviour
{
    public GameObject[] listObjects;

    public static DontDestroyOnLoadScene instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }


        instance = this;

        foreach (var element in listObjects)
        {
            // Permet de garder des éléments (avec le même "statut") d'une scène à une autre
            DontDestroyOnLoad(element);
        }
    }

    public void MoveInMainScene() 
    {
        foreach (var element in listObjects)
        {
            SceneManager.MoveGameObjectToScene(element, SceneManager.GetActiveScene());
        }
    }
}
