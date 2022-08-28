using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    private bool _isAlreadyVisible = false;

    [SerializeField]
    private float _moveSpeed = 2.0f;
    private ItemActivable _itemActivable;
    private Vector2 _targetPosition;

    void Awake()
    {
        _itemActivable = GetComponent<ItemActivable>();
        _targetPosition = transform.Find("TargetDestination").transform.position;
        _targetPosition.x = transform.position.x;
    }

    // Update is called once per frame
    void Update()
    {
        if (_itemActivable.IsActive())
        {
            Move();
        }
    }

    void Move()
    {
        transform.position = Vector2.MoveTowards(transform.position, _targetPosition, _moveSpeed * Time.deltaTime);
    }
}
