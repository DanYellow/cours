using System.Collections;
using UnityEngine;

public class ItemActivable : MonoBehaviour
{
    [SerializeField]
    private bool _isActive = false;

    public void SwitchState(bool state)
    {
        _isActive = state;
    }

    public bool IsActive()
    {
        return _isActive;
    }
}
