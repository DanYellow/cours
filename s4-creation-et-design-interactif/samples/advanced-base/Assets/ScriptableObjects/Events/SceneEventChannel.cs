using UnityEditor;
using UnityEngine;

[CreateAssetMenu(fileName ="New Scene Event", menuName = "ScriptableObjects/Events/SceneEventChannel")]
public class SceneEventChannel : AbstractEventChannel<SceneAsset> { }
