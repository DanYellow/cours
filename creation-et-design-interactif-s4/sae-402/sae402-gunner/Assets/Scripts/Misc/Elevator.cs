using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Elevator : MonoBehaviour
{
    private bool _isPlayerIn;

    private Vector2 _targetPosition;
    private Vector2 _originPosition;


    void Awake() {
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
        if (_isPlayerIn)
        {
            float step = 10.0f * Time.deltaTime;
            transform.position = Vector2.MoveTowards(transform.position, _targetPosition, step);
            // transform.Translate(Vector3.up * Time.deltaTime, Space.World);
        }
    }

    void OnTriggerEnter2D(Collider2D collider)
    {
        _isPlayerIn = true;

        Debug.Log("Hello");
    }
}
