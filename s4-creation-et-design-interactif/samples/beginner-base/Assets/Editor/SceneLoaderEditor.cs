using UnityEditor;

[CustomEditor(typeof(EndLevelV2))]
public class SceneLoaderEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();

        var loader = (EndLevelV2)target;

        var scenes = EditorBuildSettings.scenes;
        string[] sceneNames = new string[scenes.Length];

        for (int i = 0; i < scenes.Length; i++)
        {
            sceneNames[i] = System.IO.Path.GetFileNameWithoutExtension(scenes[i].path);
        }

        EditorGUI.BeginChangeCheck();
        int newValue = EditorGUILayout.Popup(
            "Scene To Load",
            loader.sceneToLoad,
            sceneNames
        );

        if (EditorGUI.EndChangeCheck())
        {
            Undo.RecordObject(loader, "Change Scene To Load");
            loader.sceneToLoad = newValue;
            EditorUtility.SetDirty(loader);
        }
    }
}
