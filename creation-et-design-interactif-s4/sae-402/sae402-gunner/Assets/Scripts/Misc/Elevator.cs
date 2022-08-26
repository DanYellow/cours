using UnityEngine;
using System.Collections;

public class Elevator : MonoBehaviour
{
    private bool _isPlayerIn;
    private bool _isAlreadyVisible = false;

    private float _speed = 2.0f;
    private float _globalSpeed;

    private Animator _animator;
    private ItemActivable _itemActivable;

    private Vector2 _destinationPosition;
    private Vector2 _originPosition;

    void Awake()
    {
        _animator = GetComponent<Animator>();
        _itemActivable = GetComponent<ItemActivable>();
        _destinationPosition = transform.Find("DestinationPosition").transform.position;
        _destinationPosition.x = transform.position.x;
    }
    // Start is called before the first frame update
    void Start()
    {
        _originPosition = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        if (_itemActivable.IsActive())
        {
            Move();
            if(GetComponent<Renderer>().isVisible && _isAlreadyVisible) {
                StartCoroutine(SwitchStateVisually());
            }
        }
    }

    void Move()
    {
        _globalSpeed = _speed * Time.deltaTime;

        if (_isPlayerIn)
        {
            transform.position = Vector2.MoveTowards(transform.position, _destinationPosition, _globalSpeed);
        }
        else
        {
            transform.position = Vector2.MoveTowards(transform.position, _originPosition, _globalSpeed);
        }
    }

    void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            _isPlayerIn = true;
        }
    }

    void OnTriggerExit2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            _isPlayerIn = false;
        }
    }

    void OnBecameVisible()
    {
        if (_itemActivable.IsActive())
        {
            StartCoroutine(SwitchStateVisually());
        }

        if(!_itemActivable.IsActive() && !_isAlreadyVisible) {
            _isAlreadyVisible = true;
        }
    }

    IEnumerator SwitchStateVisually()
    {
        yield return new WaitForSeconds(1.5f);
        _animator.SetBool("IsActivated", _itemActivable.IsActive());
    }
}
