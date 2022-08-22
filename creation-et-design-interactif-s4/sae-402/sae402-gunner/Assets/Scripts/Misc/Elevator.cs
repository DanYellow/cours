using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Elevator : MonoBehaviour
{
    private bool _isPlayerIn;

    private float _speed = 2.0f;
    private float _globalSpeed;

    private Vector2 _targetPosition;
    private Vector2 _originPosition;


    void Awake()
    {
        _targetPosition = transform.Find("TargetPosition").transform.position;
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

    void OnTriggerEnter2D(Collider2D collider)
    {
        _isPlayerIn = true;

        Debug.Log("Hello");
    }

    void OnTriggerExit2D(Collider2D collider)
    {
        _isPlayerIn = false;
    }
}
