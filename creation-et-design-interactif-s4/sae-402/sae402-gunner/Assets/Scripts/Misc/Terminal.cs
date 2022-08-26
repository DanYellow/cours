using UnityEngine;

public class Terminal : MonoBehaviour
{
    private Animator _animator;
    public GameObject itemToActivate;

    private ItemActivable _itemActivable;
    private bool _fulfillHisRole;

    public delegate void OnActivationDelegate(Vector2 position);
    public static OnActivationDelegate onActivationDelegate;

    void Awake() {
        _fulfillHisRole = false;
        _animator = GetComponent<Animator>();
        _itemActivable = itemToActivate.GetComponent<ItemActivable>();
    }

    void OnTriggerEnter2D(Collider2D collider) 
    {
        if (collider.CompareTag("Player") && !_fulfillHisRole)
        {
            Activate();
        }
    }

    void Activate() {
        _itemActivable.SwitchState(true);
        _animator.SetBool("IsActivated", true);
        onActivationDelegate?.Invoke(_itemActivable.transform.position);
        
        _fulfillHisRole = true;
    }
}
