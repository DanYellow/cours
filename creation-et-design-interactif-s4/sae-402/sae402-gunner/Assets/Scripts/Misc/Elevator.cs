using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Elevator : MonoBehaviour
{
    private bool _isPlayerIn;

    private float _speed = 2.0f;
    private float _globalSpeed;

    private Animator _animator;

    private Vector2 _targetPosition;
    private Vector2 _originPosition;

    [SerializeField]
    private bool _isActive = false;


    void Awake()
    {
        _animator = GetComponent<Animator>();
        _targetPosition = transform.Find("TargetPosition").transform.position;
        _targetPosition.x = transform.position.x;
    }
    // Start is called before the first frame update
    void Start()
    {
        _originPosition = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        Move();
    }

    void Move()
    {
        if (_isActive)
        {
            _globalSpeed = _speed * Time.deltaTime;

            if (_isPlayerIn)
            {
                transform.position = Vector2.MoveTowards(transform.position, _targetPosition, _globalSpeed);
            }
            else
            {
                transform.position = Vector2.MoveTowards(transform.position, _originPosition, _globalSpeed);
            }
        }
    }

    void OnTriggerEnter2D(Collider2D collider)
    {
        _isPlayerIn = true;
    }

    void OnTriggerExit2D(Collider2D collider)
    {
        _isPlayerIn = false;
    }

    public void SwitchState(bool state)
    {
        _isActive = state;
        
    }

    void OnBecameVisible()
    {
        StartCoroutine(SwitchStateVisually());
    }

    IEnumerator SwitchStateVisually() {
        yield return new WaitForSeconds(1.5f);
        _animator.SetBool("IsActivated", _isActive);
    }
}
