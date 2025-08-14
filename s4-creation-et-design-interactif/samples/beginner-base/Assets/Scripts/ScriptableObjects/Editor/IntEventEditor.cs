using UnityEditor;
using UnityEngine;

// https://learn.unity.com/tutorial/editor-scripting#5c7f8528edbc2a002053b5f6
[CustomEditor(typeof(IntEventChannelSO), editorForChildClasses: true)]
public class IntEventEditor : Editor
{
    int value = 0;

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
 
        GUI.enabled = Application.isPlaying;

        IntEventChannelSO e = target as IntEventChannelSO;

        value = EditorGUILayout.IntField("Number of clones:", value);
    
        if (GUILayout.Button("Raise"))
            e.Raise(value);
    }
}
