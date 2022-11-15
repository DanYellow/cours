using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerWeapon : MonoBehaviour
{
    public Transform firePoint;
    public GameObject bulletPrefab;
    public Animator animator;

    Vector3 originalRotation;
    [SerializeField]
    Vector3 recoil;

    [SerializeField]
    float recoilTime;

    // Start is called before the first frame update
    void Start()
    {
        originalRotation = transform.localEulerAngles;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.V))
        {
            // Shoot();
            StartCoroutine(Shoot());
            animator.SetTrigger("Shoot");
        }
    }

    void AddRecoil()
    {
        transform.localEulerAngles += recoil;
    }

    void StopRecoil()
    {
        
        transform.localEulerAngles = new Vector3(transform.localEulerAngles.x, transform.localEulerAngles.y, originalRotation.z);
    }

    IEnumerator Shoot()
    {
        AddRecoil();
        Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);
        yield return new WaitForSeconds(recoilTime);
        // yield return new WaitForSeconds(0.02f);
        // yield return 0;
        StopRecoil();
    }
}
