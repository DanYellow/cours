using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Terminal : MonoBehaviour
{
    private Animator _animator;
    public GameObject itemToActivate;

    private Elevator _elevator;
    private bool _fulfillHisRole;

    public delegate void OnActivationDelegate(Vector2 position);
    public static OnActivationDelegate onActivationDelegate;

    void Awake() {
        _fulfillHisRole = false;
        _animator = GetComponent<Animator>();
        _elevator = itemToActivate.GetComponent<Elevator>();
    }

    void OnTriggerEnter2D(Collider2D collider) 
    {
        if (collider.CompareTag("Player") && !_fulfillHisRole)
        {
            Debug.Log("Activate");
            Activate();
        }
    }

    void Activate() {
        _elevator.SwitchState(true);
        _animator.SetBool("IsActivated", true);
        onActivationDelegate?.Invoke(_elevator.transform.position);
        _fulfillHisRole = true;
    }
}
