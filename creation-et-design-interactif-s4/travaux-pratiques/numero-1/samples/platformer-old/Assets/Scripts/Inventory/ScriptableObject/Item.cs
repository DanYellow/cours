using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Inventory/Item")]
public class Item : ScriptableObject
{
    [SerializeField]
	private string name = default;

	[Tooltip("A preview image for the item")]
	[SerializeField]
	private Sprite previewImage = default;

	[Tooltip("A description of the item"), SerializeField, Multiline]
	private string description = default;
}
