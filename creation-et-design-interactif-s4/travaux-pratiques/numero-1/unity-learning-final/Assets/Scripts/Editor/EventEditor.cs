using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(VoidEventSO), editorForChildClasses: true)]
public class EventEditor : Editor
{
    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        GUI.enabled = Application.isPlaying;

        VoidEventSO e = target as VoidEventSO;
        if (GUILayout.Button("Raise"))
            e.RaiseEvent();
    }
}
