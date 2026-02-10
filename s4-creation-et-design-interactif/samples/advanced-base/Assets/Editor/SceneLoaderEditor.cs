using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(SceneLoader))]
public class SceneLoaderEditor : Editor
{
    public override void OnInspectorGUI()
    {
        var loader = (SceneLoader)target;

        var scenes = EditorBuildSettings.scenes;
        string[] sceneNames = new string[scenes.Length];

        for (int i = 0; i < scenes.Length; i++)
        {
            sceneNames[i] = System.IO.Path.GetFileNameWithoutExtension(scenes[i].path);
        }

        loader.sceneIndex = EditorGUILayout.Popup(
            "Scene To Load",
            loader.sceneIndex,
            sceneNames
        );

        EditorUtility.SetDirty(loader);
    }
}
